import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: 'gbrxde2e', // get this either from the sanity project dasjboard or the sanity project
	dataset: 'production',
	useCdn: true,
	apiVersion: '2025-02-07'
};

const sanityClient = createClient(config);
export default sanityClient;
