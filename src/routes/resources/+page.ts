import sanityClient from '$lib/utils/sanity';

export const load = async () => {
	// Get the event resource data from Sanity
	const eventResources: SanityEventResource[] = await sanityClient.fetch(
		'*[_type == "eventResource"] | order(date desc)'
	); // check this in the sanity docs

	return {
		eventResources
	};
};
