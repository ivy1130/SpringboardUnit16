'use strict'

// This is the global list of the stories, an instance of StoryList
let storyList

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart () {
	storyList = await StoryList.getStories()
	$storiesLoadingMsg.remove()

	putStoriesOnPage()
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup (story) {
	// console.debug("generateStoryMarkup", story);

	const hostName = story.getHostName()
	return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `)
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage () {
	console.debug('putStoriesOnPage')

	$allStoriesList.empty()

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story)
		$allStoriesList.append($story)
	}

	$allStoriesList.show()
}

// Get submit form inputs, add it to the server, generate its HTML, and put it on the page

async function putNewStoryOnPage (evt) {
	console.debug('putNewStoryOnPage', evt)
	evt.preventDefault()

	const author = $('#submit-story-author').val()
	const title = $('#submit-story-title').val()
	const url = $('#submit-story-url').val()

	const newStory = await storyList.addStory(currentUser, {author, title, url})

	const $newStory = generateStoryMarkup(newStory)

	$allStoriesList.prepend($newStory)
	$submitStoryForm.trigger('reset')
	$submitStoryForm.hide()
}

$submitStoryForm.on('submit', putNewStoryOnPage)

// Clear submit form inputs and hide form when user clicks "cancel"

function cancelSubmitStory (evt) {
	evt.preventDefault()
	$submitStoryForm.trigger('reset')
	$submitStoryForm.hide()
}

$('#cancel-submit-story-button').on('click', cancelSubmitStory)
