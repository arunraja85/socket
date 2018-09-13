// const socket = io('http://localhost:3000');

let channelArrayList = [];
function sendMessage(event) {
	event.preventDefaults();
	let channel = document.getElementById("channel").value;
	let message = document.getElementById("message").value;
	let chatContainer = document.getElementById("chatContainer");
	let divClass = document.createElement("div");
	divClass.className = "col-12";
	let cardReceivedDiv = document.createElement("div");
	cardReceivedDiv.className = "card received-message"
	divClass.appendChild(cardReceivedDiv);
	let cardBodyDiv = document.createElement("div");
	cardBodyDiv.className = "card sent-message"
	cardReceivedDiv.appendChild(cardBodyDiv);
	let paragraphDiv = document.createElement("p");
	paragraphDiv.className = "card-text";
	cardBodyDiv.appendChild(paragraphDiv);
	let messageContent = document.createTextNode(message);
	paragraphDiv.appendChild(messageContent);
	document.getElementById("chatContainer").appendChild(divClass);
	//io.sockets.to(channel).emit(message);
	socket.emit('message',message);


}

socket.on("card sent-message",messsage => {
	let divClass = document.createElement("div");
	divClass.className = "col-12";
	let cardSentDiv = document.createElement("div");
	cardSentDiv.className = "card sent-message"
	divClass.appendChild(cardSentDiv);
	let cardBodyDiv = document.createElement("div");
	cardBodyDiv.className = "card sent-message"
	cardSendDiv.appendChild(cardBodyDiv);
	let paragraphDiv = document.createElement("p");
	paragraphDiv.className = "card-text";
	cardBodyDiv.appendChild(paragraphDiv);
	let messageContent = document.createTextNode(message);
	paragraphDiv.appendChild(messageContent);
	document.getElementById("chatContainer").appendChild(divClass);
})

function joinChannel() {
	event.preventDefault();
	const channelName = document.getElementById("newchannel").value;
	// socket.join(channelName);
	// io.sockets.in(channelName).emit(channelName);
	socket.on('subscribe', (channel) => {
		socket.join('room', channel);

	})
	io.sockets.in(channelName).emit(channelName);

}

function leaveChannel() {
	event.preventDefault();
	const repo = document.getElementById("newchannel").value;
	// socket.(repo);
}

function onWelcomeMessageReceived() {
}

function onNewMessageReceived() {
}

function onAddedToNewChannelReceived() {
	// event.preventDefault();
	console.log("Entering inside of new channel received");
	const userName = document.getElementById("username").value;
	const channels = document.getElementById("channels").value;
	const alertDiv = document.getElementById("alertContainer");
	channelArrayList = channels.split(",");
	let alertDivContent = "";
	alertDivContent = alertDivContent +
		`<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are added to <strong>${channels}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>`
	alertDiv.innerHTML = alertDivContent;
	const channelDropDown = document.getElementById("channelsList");
	let channelContent = "";
	channelArrayList.map(ch => {
		channelContent = channelContent +
			`<option>${ch}</option>`
	});
	channelDropDown.innerHTML = channelContent;
	socket.emit('channel', channels);
}

function onRemovedFromChannelReceived() {
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

