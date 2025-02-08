import sanityClient from '$lib/utils/sanity';
import type { EventResource } from '$lib/types/sanity';

export const load = async () => {
	// Get the event resource data from Sanity
	const eventResource: EventResource[] = await sanityClient.fetch(
		'*[_type == "eventResource"] | order(date desc)'
	); // check this in the sanity docs

	return {
		eventResource
	};
};
