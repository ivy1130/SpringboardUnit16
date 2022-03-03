'use strict'

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories (evt) {
	console.debug('navAllStories', evt)
	hidePageComponents()
	putStoriesOnPage()
}

$body.on('click', '#nav-all', navAllStories)

/** Show login/signup on click on "login" */

function navLoginClick (evt) {
	console.debug('navLoginClick', evt)
	hidePageComponents()
	$loginForm.show()
	$signupForm.show()
}

$navLogin.on('click', navLoginClick)

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin () {
	console.debug('updateNavOnLogin')
	$('.main-nav-links').show()
	$navLogin.hide()
	$navLogOut.show()
	$navSubmit.show()
	$navFavorites.show()
	$navMyStories.show()
	$navUserProfile.text(`${currentUser.username}`).show()
}

// Show submit form on click on "submit"

function navSubmitClick (evt) {
	console.debug('navSubmitClick', evt)
	$submitStoryForm.show()
}

$navSubmit.on('click', navSubmitClick)

function showFavoriteStories () {
	hidePageComponents()
	$favoriteStoriesList.empty()

	const favoriteStories = currentUser.favorites

	for (let favoriteStory of favoriteStories) {
		const $favoriteStory = generateStoryMarkup(favoriteStory)
		$favoriteStoriesList.append($favoriteStory)
	}
	$favoriteStoriesList.show()
}

$navFavorites.on('click', showFavoriteStories)

function showMyStories () {
	hidePageComponents()
	$myStoriesList.empty()

	const myStories = currentUser.ownStories

	for (let myStory of myStories) {
		const $myStory = generateStoryMarkup(myStory)
		const $deleteStory = $(`<button class="delete-story-button">delete</button>`)
		$myStory.append($deleteStory)
		$myStoriesList.append($myStory)
	}
	$myStoriesList.show()
}

$navMyStories.on('click', showMyStories)
