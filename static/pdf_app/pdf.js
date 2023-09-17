document.addEventListener("DOMContentLoaded", function () {
    const fileUploadForm = document.getElementById("fileUploadForm");
    const fileInput = document.getElementById("fileInput");
    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const userInputpdf = document.getElementById("pdf_text");
    const sendButtonpdf = document.getElementById("sendpdfMessage");

    fileUploadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        // Send the PDF file to the server
        fetch("http://localhost:8000/upload_pdf/", { // Update the URL as needed
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Display the response from the server in the chat
                chatMessages.innerHTML += `<div><strong>User:</strong> Uploaded PDF</div>`;
            })
            .catch((error) => {
                console.error("Error uploading PDF:", error);
            });
    });

    sendMessageButton.addEventListener("click", function () {
        const message = messageInput.value;
        if (message.trim() === "") {
            return;
        }
        console.log(message)
        // Send the user's message to the server
        fetch("http://localhost:8000/chat_with_bot/", { // Update the URL as needed
            method: "POST",
            body: JSON.stringify({ message }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Display the response from the server in the chat
                chatMessages.innerHTML += `<div><strong>User:</strong> ${message}</div>`;
                chatMessages.innerHTML += `<div><strong>Bot:</strong> ${data.output}</div>`;
                messageInput.value = "";
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    });

    // sendButtonpdf.addEventListener("click", function() {
    //     var pdfmessage = userInputpdf.value;
    //     if (pdfmessage.trim() !== "") {

    //         // Get the send URL from the data attribute
    //         // const sendUrl = sendButtonpdf.getAttribute("data-send-url");
    //         console.log(pdfmessage)
    //         userInputpdf.value = "";
    //         // You can add AJAX code here to send the user message to the server
    //             // Send user message to server using AJAX
    //             sendUserMessageToServer(pdfmessage);
    //         }
    //     });

                // Example POST method implementation:
        // async function postData(url = "http://localhost:8000/bot/", data = {"messagee": message}) { 
        //     const response = await fetch(url, {
        //     method: "POST", headers: {
        //         "Content-Type": "application/json", 
        //     }, body: JSON.stringify(data),  
        //     });
        //     return response.json(); 
        // }

        // sendButtonpdf.addEventListener("click", async ()=>{ 
        //     userMessage = document.getElementById("user-input").value;
        //     document.getElementById("user-input").value = "";
        //     document.querySelector(".right2").style.display = "block"
        //     document.querySelector(".right1").style.display = "none"
        
        //     question1.innerHTML = userMessage;
        //     question2.innerHTML = userMessage;
        
        //     // Get the answer and populate it! 
        //     let result = await postData("http://127.0.0.1:8000/bot/", {"question": userMessage})
        //     solution.innerHTML = result.answer
        // })



        userInputpdf.addEventListener('keydown', function (event) {
            var pdfmessage = userInputpdf.value;
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevent the default Enter key behavior (e.g., new line)
                // sendButtonpdf.click();
                sendUserMessageToServer(pdfmessage);

                // Clear the textarea after sending the message
                userInputpdf.value = '';        
            }
        });

        // userInputpdf.addEventListener("keydown", function(event) {
        //     if (event.key === "Enter") {
                
        // });
        
        


        console.log(pdf_text);
    function sendUserMessageToServer(pdf_text) {
        console.log(pdf_text);
        fetch("http://localhost:8000/d/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({
                "pdf_text": pdf_text
                
            
            })
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // Function to get CSRF token from cookies
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
});





