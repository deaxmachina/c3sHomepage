import sanityClient from '$lib/utils/sanity';

export const load = async () => {
	// Get the event resource data from Sanity
	const events: Event[] = await sanityClient.fetch('*[_type == "event"]'); // check this in the sanity docs

	return {
		events
	};
};
