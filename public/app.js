

function signUp()
{
	

	var email = document.getElementById('txtEmail').value;
	var password = document.getElementById('txtPassword').value;
	firebase.auth().createUserWithEmailAndPassword(email,password).then(function(data1){
		

		var JsonKey = 
		{
		"uid": data1.uid,
		"txtEmail":email
		}
		firebase.database().ref('users/' + data1.uid).set(JsonKey).then(function(user){
			if (user) 
			{
				alert("Signed up!")

				window.location.href = "notes.html";
	       	} 
        else 
        {
        	alert("Account created succesfully!")
        	window.location.href ="notes.html";   

        	
        }
    	}).catch(function(error)
        {
        	console.log(error);
        	alert(error);
        });
		
}).catch(function(error)
{
	console.log(error);
	alert(error);
});
}

function signIn()
{
	
	var email = document.getElementById('txtEmail').value;
	var password = document.getElementById('txtPassword').value;
	firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
			if (user) 
		{
        	document.location.href ="notes.html";
        } 
        else 
        {

        }
    }).catch(function(error)
        {
        	console.log(error);
        	alert(error);
        });
		
	
	
}


function logOut()
{
	firebase.auth().signOut().then(function()
	{
		window.location.href ="index.html";
	})

}

function createNote2()
{
	name = document.getElementById('txtNoteName').value;
  	description = document.getElementById('txtNoteDescription').value;
  	var database = firebase.database();
  	var userId = firebase.auth().currentUser.uid;
  	database.ref('users/' + userId + '/'  + 'notes').push(
  	{
  		noteName : name,
  		noteDescription : description
  	});

  	console.log(name);
  	console.log(description);
  	$('#modal .close').click()
  	  	  window.location.reload(); 

  

}

function drawNotes()
{
	var userId = firebase.auth().currentUser.uid;
	var key = '/users/' + userId + '/' + 'notes';
	firebase.database().ref('/users/' + userId + '/' + 'notes/').once('value').then(function(snapshot)
	{
	const currentUserNotes = snapshot.val();
			for (var key in currentUserNotes) 
		{
	    if (currentUserNotes.hasOwnProperty(key)) 
	   	 	{
	   	 		var currentNote = currentUserNotes[key];
	   	 		console.log(1);
			  var name = currentNote.noteName;
			  console.log(name);
			  var description = currentNote.noteDescription


			var html = " <tr> <td><span id='Name" + "'>" + name + "</span></td> <td> <span id='Description" + userId + "'>" + description + "</span></td></tr>"
					$("#notas").append(html);
			}
		}

	});
}






