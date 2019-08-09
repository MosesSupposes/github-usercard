/**
 * Main
 */

const lambdaInstructors = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];

renderCards(["MosesSupposes", ...lambdaInstructors])

fetchGhFollowers("MosesSupposes")
	.then(function fetchAndRenderFriendData(res) {
		res.forEach(friend => {
		fetchGhProfile(friend.login)
		.then(renderIntoCard, logError)
	})
	.catch(logError)
})

/**
 * Helpers 
 */


function fetchGhProfile(username) {
	return axios
		.get(`https://api.github.com/users/${username}`)
		.then(res => res.data)
		.catch(logError)
}

function fetchGhFollowers(username) {
	return axios
		.get(`https://api.github.com/users/${username}/followers`)
		.then(res => res.data)
		.catch(logError)
}

function renderCards(usernames) {
	usernames.forEach(function fetchAndRenderProfileData(username) {
		fetchGhProfile(username)
		.then(renderIntoCard)
		.catch(logError)
	})
}

function renderIntoCard(data) {
	document.querySelector('.cards').appendChild( Card(data) )
}

function Card(info) {
	const card = document.createElement('div')
	card.classList.add('card')

	const img = document.createElement('img')
	img.src = info.avatar_url

	const cardInfo = document.createElement('div')

	const name = document.createElement('h3')
	name.classList.add('name')
	name.textContent = info.name

	const username = document.createElement('p')
	username.classList.add('username')
	username.textContent = info.login

	const location = document.createElement('p')
	location.textContent = `Location: ${info.location}`

	const profile = document.createElement('p')
	profile.textContent = "Profile: "

	const profileLink = document.createElement('a')
	profileLink.href = info.html_url
	profileLink.textContent = info.html_url

	const followers = document.createElement('p')
	followers.textContent = `Followers: ${info.followers}`

	const following = document.createElement('p')
	following.textContent = `Following: ${info.following}`

	const bio = document.createElement('p')
	bio.textContent = `Bio: ${info.bio}`


	appendChildren(card, [img, cardInfo])

	appendChildren(
        cardInfo, 
        [name, username, location, profile, profileLink, followers, following, bio]
    )

	
	return card
}

function appendChildren(to, elements) {
    elements.forEach(element => {
        to.appendChild(element)
    })
}

function logError(err) {
	console.error(err)
}
