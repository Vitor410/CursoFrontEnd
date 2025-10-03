"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './page.module.css';

// responsavel pela interação do usuario

export default function LoginPage() {
    const [username, setUsername] = useState(""); //campo para digitar o username
    const [password, setPassword] = useState(""); //campo para digitar a senha
    const [error, setError] = useState(""); //campo para exibir mensagens de erro
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const route = useRouter(); //rotas de navegação

    //método para enviar o login 
    const handSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //evita o recarregamento da página
        setError(""); //limpa a mensagem de erro

        try {
            const response = await fetch(
                "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            }
            );
            //analisar a resposta do fetch
            const data = await response.json()
            if (data.success) {
                //armazenar as informações do usuário no localStorage
                localStorage.setItem("token", data.token); //armazenar o token
                localStorage.setItem("userRole", data.usuario.tipo); //armazenar o tipo do usuário
                route.push("/dashboard"); //redirecionar para o dashboard
            } else {
                const erroData = data.error;
                setError(erroData || "Falha de Login");
            }
        } catch (error) {
            console.error("Login Failed:", error);
            setError("Erro de Servidor");
        }

    }

    //reactDOM
    return (
        <div className={styles.center}>
            <h2 className={styles.title}>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handSubmit}>
                <div className={styles.username}>
                    <label className={styles.label} htmlFor="username">UserName</label>
                    <input
                        type="text"
                        className={`${styles.inputText} ${usernameFocus ? styles.inputTextFocus : ''}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                        required />
                </div>
                <div className={styles.password}>
                    <label className={styles.label} htmlFor="password">Senha</label>
                    <input
                        type="password"
                        className={`${styles.inputPassword} ${passwordFocus ? styles.inputPasswordFocus : ''}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
