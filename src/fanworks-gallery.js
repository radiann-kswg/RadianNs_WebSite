const DEFAULT_DB_NAME = "Gallery";

const fanworksGalleryComponent = {
	template: `
		<div>
			<section class="fanworks-hero">
				<h1 class="h1-noimg">ギャラリー</h1>
				<p class="fanworks-lead">
					作品ごとの JSON データベースから、二次創作イラストを一覧・詳細表示します。
					画像や説明文は後から差し替えや追加がしやすい構成にしてあります。
				</p>
			</section>

			<section class="fanworks-shell">
				<div class="fanworks-controls" aria-label="ギャラリーフィルター">
					<label class="fanworks-control">
						<span>作品</span>
						<select v-model="selectedWorkId" @change="handleWorkChange">
							<option v-for="work in works" :key="work.workId" :value="work.workId">
								{{ workLabel(work) }}
							</option>
						</select>
					</label>

					<label class="fanworks-control">
						<span>DB</span>
						<select v-model="selectedDbName" @change="handleDbChange">
							<option v-for="db in currentDbOptions" :key="db.dbName" :value="db.dbName">
								{{ dbLabel(db) }}
							</option>
						</select>
					</label>

					<label class="fanworks-control fanworks-control-search">
						<span>絞り込み</span>
						<input
							v-model.trim="searchQuery"
							@input="handleQueryChange"
							type="search"
							placeholder="タイトル・タグ・説明で検索"
						/>
					</label>

					<label class="fanworks-control">
						<span>カテゴリ</span>
						<select v-model="selectedCategory" @change="handleQueryChange">
							<option value="">すべて</option>
							<option v-for="category in categoryOptions" :key="category.value" :value="category.value">
								{{ categoryLabel(category.value) }}
							</option>
						</select>
					</label>
				</div>

				<p v-if="currentWork" class="fanworks-summary">
					{{ workSummary(currentWork) }}
				</p>

				<p v-if="errorMessage" class="fanworks-error">{{ errorMessage }}</p>
				<p v-else-if="isLoading" class="fanworks-loading">ギャラリーを読み込んでいます...</p>

				<div v-else class="fanworks-layout">
					<section class="fanworks-results" aria-label="ギャラリー一覧">
						<div class="fanworks-results-head">
							<h2>作品一覧</h2>
							<p>{{ filteredRecords.length }} 件</p>
						</div>

						<div v-if="filteredRecords.length" class="fanworks-grid">
							<button
								v-for="record in filteredRecords"
								:key="record.Index"
								type="button"
								class="fanwork-card"
								:class="{ active: activeRecord && activeRecord.Index === record.Index }"
								@click="selectRecord(record)"
							>
								<div class="fanwork-card-image" :class="{ 'is-empty': !cardImage(record) }">
									<img v-if="cardImage(record)" :src="cardImage(record)" :alt="cardTitle(record)" />
									<span v-else>Image Placeholder</span>
								</div>
								<div class="fanwork-card-body">
									<p class="fanwork-card-meta">{{ workLabel(currentWork) }} / {{ categoryLabel(record.Category) }}</p>
									<h3>{{ cardTitle(record) }}</h3>
									<p>{{ cardSummary(record) }}</p>
									<ul v-if="Array.isArray(record.Tags) && record.Tags.length" class="fanwork-tag-list">
										<li v-for="tag in record.Tags" :key="tag">{{ tag }}</li>
									</ul>
								</div>
							</button>
						</div>

						<div v-else class="fanworks-empty">
							<p>該当する作品がありません。JSON を追加するか、検索条件を見直してください。</p>
						</div>
					</section>

					<aside class="fanworks-detail" aria-label="作品詳細">
						<div v-if="activeRecord">
							<div class="fanworks-detail-head">
								<p class="fanwork-card-meta">{{ workLabel(currentWork) }} / {{ categoryLabel(activeRecord.Category) }}</p>
								<h2>{{ cardTitle(activeRecord) }}</h2>
								<p>{{ cardSummary(activeRecord) }}</p>
							</div>

							<div v-for="section in detailSections" :key="section.key" class="fanworks-detail-section">
								<h3>{{ section.label }}</h3>
								<div v-if="section.key === 'images'" class="fanworks-gallery-grid">
									<div
										v-for="(image, imageIndex) in detailImages(activeRecord)"
										:key="image + '-' + imageIndex"
										class="fanworks-gallery-image"
									>
										<img :src="image" :alt="cardTitle(activeRecord) + ' ' + (imageIndex + 1)" />
									</div>
									<div v-if="!detailImages(activeRecord).length" class="fanworks-gallery-image is-empty">
										<span>画像は後から追加できます</span>
									</div>
								</div>

								<div v-else-if="section.key === 'links'" class="fanworks-link-list">
									<a
										v-for="link in activeLinks(activeRecord)"
										:key="link.href"
										class="a-link"
										:href="link.href"
										target="_blank"
										rel="noopener noreferrer"
									>
										{{ link.label }}
									</a>
									<p v-if="!activeLinks(activeRecord).length">外部リンクはまだ設定されていません。</p>
								</div>

								<dl v-else class="fanworks-detail-list">
									<div v-for="field in section.fields" :key="field.key">
										<dt>{{ field.label }}</dt>
										<dd>{{ field.value }}</dd>
									</div>
								</dl>
							</div>
						</div>

						<div v-else class="fanworks-empty">
							<p>一覧からカードを選ぶと詳細が表示されます。</p>
						</div>
					</aside>
				</div>
			</section>
		</div>
	`,
	data() {
		return {
			searchQuery: "",
			selectedCategory: "",
			selectedWorkId: "",
			selectedDbName: DEFAULT_DB_NAME,
			works: [],
			meta: {},
			dbType: {},
			records: [],
			activeIndex: "",
			isLoading: true,
			errorMessage: "",
		};
	},
	computed: {
		currentWork() {
			return this.works.find((work) => work.workId === this.selectedWorkId) || null;
		},
		currentDbOptions() {
			return this.currentWork?.databases || [];
		},
		filteredRecords() {
			const query = this.searchQuery.toLowerCase();
			return this.records.filter((record) => {
				const categoryMatched = !this.selectedCategory || record.Category === this.selectedCategory;
				if (!categoryMatched) {
					return false;
				}

				if (!query) {
					return true;
				}

				const searchPool = [
					record.Index,
					record.Title,
					record.Title_JP,
					record.Summary,
					record.Summary_JP,
					record.Note,
					record.Note_JP,
					record.Category,
					...(Array.isArray(record.Tags) ? record.Tags : []),
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				return searchPool.includes(query);
			});
		},
		activeRecord() {
			return this.filteredRecords.find((record) => record.Index === this.activeIndex)
				|| this.records.find((record) => record.Index === this.activeIndex)
				|| null;
		},
		categoryOptions() {
			const varsDef = this.meta?.General?.$VarsDef?.["#List_Category"] || [];
			const usedValues = new Set(this.records.map((record) => record.Category).filter(Boolean));
			return varsDef.filter((entry) => usedValues.has(entry.value));
		},
		detailSections() {
			if (!this.activeRecord) {
				return [];
			}

			const sections = [
				{ key: "basic", label: this.sectionLabel("basic") },
				{ key: "notes", label: this.sectionLabel("notes") },
				{ key: "images", label: this.sectionLabel("images") },
				{ key: "links", label: this.sectionLabel("links") },
			];

			return sections
				.map((section) => ({
					...section,
					fields: this.sectionFields(section.key, this.activeRecord),
				}))
				.filter((section) => {
					if (section.key === "images") {
						return true;
					}
					if (section.key === "links") {
						return true;
					}
					return section.fields.length > 0;
				});
		},
	},
	async mounted() {
		await this.initialize();
	},
	methods: {
		async initialize() {
			this.isLoading = true;
			this.errorMessage = "";

			try {
				const [meta, dbType] = await Promise.all([
					this.fetchJson("/data/db_meta.json"),
					this.fetchJson("/data/db_type.json"),
				]);

				this.meta = meta;
				this.dbType = dbType;
				this.works = Array.isArray(meta.CreationWorks) ? meta.CreationWorks : [];

				const locator = this.parseLocator(new URLSearchParams(window.location.search).get("c"));
				const params = new URLSearchParams(window.location.search);
				this.searchQuery = params.get("q") || "";
				this.selectedCategory = params.get("category") || "";
				this.selectedWorkId = locator.workId || this.works[0]?.workId || "";
				this.selectedDbName = locator.dbName || DEFAULT_DB_NAME;
				this.activeIndex = locator.index || "";

				await this.loadRecords();
			} catch (error) {
				console.error(error);
				this.errorMessage = "ギャラリーDBの読み込みに失敗しました。data 配下の JSON を確認してください。";
			} finally {
				this.isLoading = false;
			}
		},
		async fetchJson(path) {
			const response = await fetch(path, { cache: "no-store" });
			if (!response.ok) {
				throw new Error(`Failed to fetch ${path}: ${response.status}`);
			}
			return response.json();
		},
		async loadRecords() {
			if (!this.currentWork) {
				this.records = [];
				this.activeIndex = "";
				this.updateUrl();
				return;
			}

			this.isLoading = true;
			this.errorMessage = "";
			try {
				const path = `/data/${this.currentWork.path}/DataBases/db_${this.selectedDbName}.json`;
				const records = await this.fetchJson(path);
				this.records = Array.isArray(records) ? records : [];
				const recordExists = this.records.some((record) => record.Index === this.activeIndex);
				if (!recordExists) {
					this.activeIndex = this.records[0]?.Index || "";
				}
				this.updateUrl();
			} catch (error) {
				console.error(error);
				this.records = [];
				this.activeIndex = "";
				this.errorMessage = `${this.workLabel(this.currentWork)} の DB を読み込めませんでした。`;
			} finally {
				this.isLoading = false;
			}
		},
		handleWorkChange() {
			this.activeIndex = "";
			this.loadRecords();
		},
		handleDbChange() {
			this.activeIndex = "";
			this.loadRecords();
		},
		handleQueryChange() {
			if (this.activeRecord && !this.filteredRecords.some((record) => record.Index === this.activeIndex)) {
				this.activeIndex = this.filteredRecords[0]?.Index || this.activeIndex;
			}
			this.updateUrl();
		},
		selectRecord(record) {
			this.activeIndex = record.Index;
			this.updateUrl();
		},
		updateUrl() {
			const params = new URLSearchParams();
			if (this.selectedWorkId) {
				const locator = [this.selectedWorkId, this.selectedDbName];
				if (this.activeIndex) {
					locator.push(this.activeIndex);
				}
				params.set("c", locator.join("/"));
			}
			if (this.searchQuery) {
				params.set("q", this.searchQuery);
			}
			if (this.selectedCategory) {
				params.set("category", this.selectedCategory);
			}
			const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
			window.history.replaceState({}, "", nextUrl);
		},
		parseLocator(compactLocator) {
			if (!compactLocator) {
				return { workId: "", dbName: DEFAULT_DB_NAME, index: "" };
			}
			const [workId = "", dbName = DEFAULT_DB_NAME, ...indexParts] = compactLocator.split("/");
			return {
				workId,
				dbName: dbName || DEFAULT_DB_NAME,
				index: indexParts.join("/"),
			};
		},
		workLabel(work) {
			if (!work) {
				return "";
			}
			return work.WorkLabel || work.WorkLabel_JP || work.workId;
		},
		workSummary(work) {
			if (!work) {
				return "";
			}
			return work.Summary || work.Summary_JP || "";
		},
		dbLabel(db) {
			return db.DB_Label || db.dbName;
		},
		cardTitle(record) {
			return record.Title || record.Title_JP || record.Index;
		},
		cardSummary(record) {
			return record.Summary || record.Summary_JP || "";
		},
		cardImage(record) {
			return record.Thumbnail || (Array.isArray(record.Images) ? record.Images[0] : "");
		},
		categoryLabel(value) {
			const category = (this.meta?.General?.$VarsDef?.["#List_Category"] || [])
				.find((entry) => entry.value === value);
			if (!category) {
				return value || "未分類";
			}
			return category.label || category.Category_JP || category.value;
		},
		detailImages(record) {
			return Array.isArray(record.Images) ? record.Images.filter(Boolean) : [];
		},
		activeLinks(record) {
			return Array.isArray(record.Links) ? record.Links.filter((link) => link?.href && link?.label) : [];
		},
		sectionLabel(sectionKey) {
			const labels = {
				basic: "基本情報",
				notes: "メモ",
				images: "ギャラリー画像",
				links: "関連リンク",
			};
			return labels[sectionKey] || sectionKey;
		},
		fieldLabel(fieldKey) {
			const field = this.dbType?.$DefType?.[fieldKey] || {};
			return field.hashTag || field.hashTag_JP || fieldKey;
		},
		sectionFields(sectionKey, record) {
			return Object.entries(this.dbType?.$DefType || {})
				.filter(([fieldKey, definition]) => definition?.$display?.section === sectionKey)
				.filter(([fieldKey]) => !["Thumbnail", "Images", "Links"].includes(fieldKey))
				.map(([fieldKey]) => ({
					key: fieldKey,
					label: this.fieldLabel(fieldKey),
					value: this.formatFieldValue(fieldKey, record[fieldKey]),
				}))
				.filter((field) => field.value);
		},
		formatFieldValue(fieldKey, value) {
			if (value === null || value === undefined) {
				return "";
			}
			if (Array.isArray(value)) {
				if (fieldKey === "Tags") {
					return value.join(", ");
				}
				return value.filter(Boolean).join(" / ");
			}
			if (typeof value === "object") {
				return "";
			}
			if (fieldKey === "Category") {
				return this.categoryLabel(value);
			}
			return String(value);
		},
	},
};

document.addEventListener("DOMContentLoaded", () => {
	Vue.createApp({
		components: {
			"fanworks-gallery": fanworksGalleryComponent,
		},
	}).mount("#app-fanworks-gallery");
});