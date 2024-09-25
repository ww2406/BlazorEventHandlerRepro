window.loadBlazor = async (component,  params) => {
    window.blazorComponent = await addBlazor();
}

async function addBlazor() {
    const component = await Blazor.rootComponents.add(document.getElementById('blazor'), 'home', {});
    return component;
}

function clickElByHref(href) {
    const main = document.querySelector('main');

    main.replaceChildren();

    if (href !== 'showBlazor') {
        window.blazorComponent.dispose();

        const newNode = document.createElement('div');
        newNode.id = 'other';
        newNode.innerHTML = `
                    <h3>Other node</h3>
                    <button onclick="clickElByHref('showBlazor')">Show Blazor</button>
                    `;

        main.appendChild(newNode);
    } else {
        const blazorNode = document.createElement('div');
        blazorNode.id = 'blazor';

        main.appendChild(blazorNode);

        addBlazor().then(res => window.blazorComponent = res);
    }

    /*main.replaceChildren();

    if (href !== 'showBlazor') {
        window.blazorComponent.dispose();
 
        const newNode = document.createElement('div');
        newNode.id = 'other';
        newNode.innerHTML = `
                    <h3>Other node</h3>
                    <button onclick="clickElByHref('showBlazor')">Show Blazor</button>
                    `;

        main.appendChild(newNode);
    } else {
        const blazorNode = document.createElement('div');
        blazorNode.id = 'blazor';

        main.appendChild(blazorNode);

        addBlazor();
    }*/

    /**
     * To use Blazor.disconnect, need to add some sort of timeout so EndInvokeJSFromDotNet finishes before unloading.
     * Otherwise get a circuit associated with this dispatcher no longer available/dispatch while disposed error.
     * This occurs regardless of whether window.blazorComponent.dispose is called or not.
     * Calling Blazor.reconnect after Blazor.disconnect previously called does not restore the connection; 
     * showing the blazor div results in circuit associated with this dispatcher is no longer available. 
     */
    /*setTimeout(() => {
        main.replaceChildren();
        
        if (href !== 'showBlazor') {
            window.blazorComponent.dispose();
            /!*try {
                Blazor.disconnect();
            } catch (e) {

            }*!/
            const newNode = document.createElement('div');
            newNode.id = 'other';
            newNode.innerHTML = `
                    <h3>Other node</h3>
                    <button onclick="clickElByHref('showBlazor')">Show Blazor</button>
                    `;

            main.appendChild(newNode);
        } else {
            Blazor.reconnect();
            const blazorNode = document.createElement('div');
            blazorNode.id = 'blazor';

            main.appendChild(blazorNode);

            addBlazor();
        }
    }, 1500);*/

    
}

function logMessage() {
    console.log('logging message');
}