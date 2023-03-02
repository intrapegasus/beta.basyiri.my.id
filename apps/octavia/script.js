let shift = false;
let capsLock = false;

// toggle keys
function toggleShift() {
    shift = true;
}

// toggle caps lock
function toggleCapsLock() {
    if (capsLock === false) {
      capsLock = true;
      document.getElementById("capsLock").style.backgroundColor = "#09ff70";
      document.getElementById("capsLock").style.color = "#111111";
    } else {
      capsLock = false;
      document.getElementById("capsLock").style.backgroundColor = "#a02e32";
      document.getElementById("capsLock").style.color = "#ffffff";
    }
  }

// add or delete characters to/from input area
function addChar(selection) {
    let currChars = $("#inputBox").val();
    if (selection === "delete") {
        $("#inputBox").val(currChars.substring(0, currChars.length - 1));
    } else {
        if (capsLock === true && isNaN(selection)) {
            $("#inputBox").val(currChars.concat(selection.toUpperCase()));
        } else if (shift === true && isNaN(selection)) {
            $("#inputBox").val(currChars.concat(selection.toUpperCase()));
            shift = false;
        } else {
            $("#inputBox").val(currChars.concat(selection));
        }
    }
}

// save blog to local storage
function saveBlog(blog) {
    if (typeof Storage !== "undefined") {
        window.localStorage.setItem("blog", document.getElementById(blog).value);
        alert("Text has been saved locally in your browser and don't close this tab until you finish with your task!");
    }
}

// delete blog from local storage
function cancelBlog() {
    if (confirm("Are you sure you want to delete the text?") === true) {
        if (confirm("This action cannot be undone!") === true) {
            window.localStorage.removeItem("blog");
            document.location.reload();
        }
    }
}

// get the blog from local storage to the input box
function getBlog() {
    document.getElementById("inputBox").value = window.localStorage.getItem("blog");
}