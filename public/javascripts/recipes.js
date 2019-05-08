function renderPage() {
	if (document.getElementById('container')) {
		console.log("DELETING")
		document.getElementById("main").removeChild(document.getElementById('container'));
	}
	let data = $('#data').html()
	console.log("Rendering page -> " + data)
	let obj = JSON.parse(data)
	console.log(obj)

	let container = document.createElement("div");
	container.setAttribute("id", "container");
	document.getElementById("main").appendChild(container);
	// create DOM recipe element
	for (let recipe of obj.recipes) {
		let item = document.createElement("div");
		item.setAttribute("class", "item")
		// image
		let image = document.createElement("IMG"); 
		image.src = recipe.image_url
		image.addEventListener("click", function() {
			window.open(recipe.source_url, '_blank');
		})
		// caption
		let caption = document.createElement("div")
		caption.setAttribute("class", "caption")
		caption.innerHTML = recipe.title;
		item.appendChild(image)
		item.appendChild(caption)
		container.appendChild(item)
	}
}

$(document).ready(function() {
	console.log("Document is ready!")
	
	let btn = document.getElementById('selectBtn')
	let data = $('#data').html()
	$('#myForm').submit(function (e) {
		e.preventDefault();
		let ingredientData = $("#myInput").val();
		if (ingredientData.length === 0) {
			return
		}
		let requestObj = {}
		requestObj.ingredient = ingredientData
		

		// POST recipes in field, return api's recipes
		$.ajax({
		    url: '/recipes', 
		    type: 'POST', 
		    contentType: 'application/json', 
		    data: JSON.stringify(requestObj),
		    error : function () {
		    	console.log("Error")
		    },
		    success : function (data) {
	       				$('#data').html(data)
	       				renderPage()
	    	}
		})
	})
	if (data !== 'Default') {
		renderPage()
	}

})