import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

// To get the Sanity client to work
const config: ClientConfig = {
	// projectId: 'gbrxde2e', // get this either from the sanity project dasjboard or the sanity project
	// dataset: 'production',
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: true,
	apiVersion: '2025-02-07'
};

const sanityClient = createClient(config);
export default sanityClient;

// To get image url from raw sanity url
export const imgUrlBuilder = imageUrlBuilder(sanityClient);

// Check if a piece of content is html
export const isHtmlContentBlock = (rawContentBlock) => {
	return rawContentBlock._type === 'htmlBlock';
};

// Processing the content blocks from Sanity
export const processContent = (content) => {
	// Process text content
	if (content._type === 'block') {
		return {
			type: 'text',
			style: content.style,
			textToRender: content.children.map((child) => child.text).join('\n')
		};
	}
	// Process image content
	else if (content._type === 'image') {
		return {
			type: 'image',
			url: imgUrlBuilder.image(content).url(),
			alt: ''
		};
	}
	// Process html contnet
	else if (content._type === 'htmlBlock') {
		return {
			type: 'html',
			htmlToRender: content.html
		};
	}
};
