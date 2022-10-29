import { useEffect, useState } from 'react';

async function loadMessages(setMessages) {
    try {
        const res = await fetch('http://localhost:8000/messages', {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`${res.status} - ${res.statusText}`);
        }

        const json = await res.json();
        setMessages(json.messages);
    } catch (ex) {
        console.error(ex);
        alert(ex.message);
    }
}

async function saveMessage(newMessage) {
    const res = await fetch('http://localhost:8000/message', {
        method: 'POST',
        body: JSON.stringify({ message: newMessage }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
    }
}

function App() {
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState('');

    useEffect(() => {
        loadMessages(setMessages);
    }, []);

    return <main>
        <header><h1>Hello XSS</h1></header>
        <hr />
        <form onSubmit={ async (ev) => {
            ev.preventDefault();

            await saveMessage(newMessage);
            await loadMessages(setMessages);
        } } >
            <textarea style={ {
                width: 500,
                height: 150
            } } value={ newMessage } onChange={ (ev) => {
                setNewMessage(ev.nativeEvent.target.value);
            } } />

            <br />
            <button type='submit'>send message</button>
        </form>

        <hr />

        { messages.map((m) => <div key={ m.id }>
            <div
                style={ {
                    padding: '.5rem',
                    borderRadius: '.5rem',
                    margin: '.5rem',
                    border: '1px solid #F4F2F0'
                } }
                dangerouslySetInnerHTML={ { __html: m.messageHtml } } />

        </div> )}
    </main>;
}

export default App;
