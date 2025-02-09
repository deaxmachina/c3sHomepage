type SanityEvent = {
	_id: string;
	_type: 'event';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	eventName?: string;
	eventDate?: string;
	slug: string;
	image: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	tech: Array<string>;
	content: Array<
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: 'span';
					_key: string;
				}>;
				style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
				listItem?: 'bullet' | 'number';
				markDefs?: Array<{
					href?: string;
					_type: 'link';
					_key: string;
				}>;
				level?: number;
				_type: 'block';
				_key: string;
		  }
		| {
				asset?: {
					_ref: string;
					_type: 'reference';
					_weak?: boolean;
					[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
				};
				hotspot?: SanityImageHotspot;
				crop?: SanityImageCrop;
				_type: 'image';
				_key: string;
		  }
		| {
				html?: string;
				_type: 'htmlBlock';
				_key: string;
		  }
	>;
};

type SanityEventResource = {
	_id: string;
	_type: 'eventResource';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	slug: Slug;
	resourceName: string;
	linkToResource: string;
	resourceImage: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	toolsUsed: Array<string>;
	resourceType: Array<string>;
	authors: Array<string>;
	platform: Array<string>;
	keywords?: Array<string>;
	eventDescription: Array<
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: 'span';
					_key: string;
				}>;
				style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
				listItem?: 'bullet' | 'number';
				markDefs?: Array<{
					href?: string;
					_type: 'link';
					_key: string;
				}>;
				level?: number;
				_type: 'block';
				_key: string;
		  }
		| {
				html?: string;
				_type: 'htmlBlock';
				_key: string;
		  }
	>;
	metadataForEvent: {
		eventName: string;
		eventNumber: number;
		eventDate: string;
		eventLink: string;
	};
};
