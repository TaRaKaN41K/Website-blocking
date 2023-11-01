var originalTextContent = new Map();
var isLocked = true;
var hashedPassword = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
var allTextElements = document.querySelectorAll("body *");

function preventSelectionHandler(e) 
{
    e.preventDefault();
}

function contextMenuHandler(event) 
{
    event.preventDefault(); 
}

allTextElements.forEach(function (element) 
{
    originalTextContent.set(element, element.textContent);
});

document.addEventListener("keydown", function (event) 
{
    if (event.key === 'u' || event.key === 'г') 
    {
        var enteredPassword = prompt('Enter password:');
        var hashedEnteredPassword = CryptoJS.SHA256(enteredPassword).toString();

        if (hashedEnteredPassword === hashedPassword) 
        {
            alert('The password is correct!');
            alert('Protection is off!');

            isLocked = false;

            document.removeEventListener('selectstart', preventSelectionHandler);
            document.removeEventListener('contextmenu', contextMenuHandler);
            
        } 
        else 
        {
            alert('Incorrect password!');
        }
    }
    if (event.key === 'l' || event.key === 'д') 
    {
        var enteredPassword = prompt('Enter password:');
        var hashedEnteredPassword = CryptoJS.SHA256(enteredPassword).toString();

        if (hashedEnteredPassword === hashedPassword) 
        {
            alert('The password is correct!');
            alert('Protection is on!');
            
            isLocked = true;

            document.addEventListener('selectstart', preventSelectionHandler);
            document.addEventListener('contextmenu', contextMenuHandler);

            document.addEventListener("keydown", function (event) 
            {
                if ((event.shiftKey) && isLocked) 
                {
                    allTextElements.forEach(function (element) 
                    {
                        element.textContent = "";
                    });
        
                    setTimeout(function () 
                    {
                        allTextElements.forEach(function (element) 
                        {
                            element.textContent = originalTextContent.get(element);
                        });
                    }, 1000);
                }
            });
            

        }
        else 
        {
            alert('Incorrect password!');
        }
    }
});