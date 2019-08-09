/**
 * Main
 */


renderCards(["MosesSupposes"])


const lambdaInstructors = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
const myFollowers = ["techieshark", "wurde", "Brandon-Pampuch", "amlane", "kefimochi"]

renderCards(myFollowers)




/**
 * Helpers 
 */


function fetchGhProfile(username) {
	return axios
		.get(`https://api.github.com/users/${username}`)
		.then(function logData(res) {
			console.log(res.data)
			return res.data
		})
}

function renderCards(usernames) {
	usernames.forEach(function fetchAndRenderProfileData(username) {
		fetchGhProfile(username)
		.then(function renderIntoCard(data) {
			document.querySelector('.cards').appendChild( Card(data) )
		})
	})
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
