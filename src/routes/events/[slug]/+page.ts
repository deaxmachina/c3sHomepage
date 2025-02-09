import sanityClient from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	// Get just the project for the given slug
	const rawEvent = await sanityClient.fetch(`*[_type == "event" && slug == $slug]`, { slug });
	if (rawEvent.length !== 1) {
		throw error(404, 'Event not found');
	}
	const event = rawEvent[0];
	return { event };
};
