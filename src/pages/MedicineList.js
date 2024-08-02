import { useState, useEffect } from 'react';

function ProductList({ name, code, isLoggedIn }) {
    const loadInitialState = () => {
        const savedState = localStorage.getItem(`${name}-${code}-button`);
        if (savedState) {
            return JSON.parse(savedState);
        }
        return { savedColor: "green", savedText: "Available" };
    };

    const initialState = loadInitialState();
    const [color, setColor] = useState(initialState.savedColor);
    const [text, setText] = useState(initialState.savedText);

    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem(`${name}-${code}-button`, JSON.stringify({ savedColor: color, savedText: text }));
        }
    }, [color, text, name, code, isLoggedIn]);

    function toggleAvailability() {
        if (isLoggedIn) {
            if (text === "Available") {
                setText("Not available");
                setColor("red");
            } else {
                setText("Available");
                setColor("green");
            }
        } else {
            alert("You need to be logged in to edit.");
        }
    }

    return (
        <li>
            {name} {code}
            <button onClick={toggleAvailability} style={{ backgroundColor: color }}>
                {text}
            </button>
        </li>
    );
}

function Product({ isLoggedIn }) {
    const lists = [
        { name: "Aceclofenac gel(Stednac)", code: "M2653" },
        { name: "Aceclofenac Tab 100 mg(Acenac)", code: "M0006" },
        { name: "Allegra 180 mg Tab", code: "M1152" },
        { name: "Amoxycillin 250 mg Cap", code: "M0177" },
        { name: "Amoxyclav Inj 500 mg + 100 mg(clamovid)", code: "M2964" },
        { name: "Amoxyclav(Augmentin) Tab 625 mg", code: "M0165" },
        { name: "Amoxyclav(Bactoclav) Tab 625 mg", code: "M0172" },
        { name: "Amoxyclav(clamovid 228 mg) Syp", code: "M0179" },
       
    ];

    return (
        <section>
            <h3>For any correction Email :- sushil7778@yahoo.com</h3>
            <h2>Product List</h2>
            <ol>
                {lists.map((s) => (
                    <ProductList
                        key={s.code}
                        name={s.name}
                        code={s.code}
                        isLoggedIn={isLoggedIn}
                    />
                ))}
            </ol>
        </section>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("sushil7778@yahoo.com");
    const [password, setPassword] = useState("");
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        if (loggedInStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const handleRegister = () => {
        if (username && password) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            alert("Registration successful! Please log in.");
            setRegistering(false);
        } else {
            alert("Please enter both a username and a password.");
        }
    };

    const handleLogin = () => {
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUsername && password === storedPassword) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        } else {
            alert("Invalid username or password.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <div>
            <h1>Keyodhoo</h1>
            <main>
                <Product isLoggedIn={isLoggedIn} />
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <div>
                        {registering ? (
                            <>
                                <h2>Register</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={handleRegister}>Register</button>
                                <button onClick={() => setRegistering(false)}>Go to Login</button>
                            </>
                        ) : (
                            <>
                                <h2>Login</h2>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={handleLogin}>Login</button>
                                <button onClick={() => setRegistering(true)}>Register</button>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
export { ProductList, Product };

