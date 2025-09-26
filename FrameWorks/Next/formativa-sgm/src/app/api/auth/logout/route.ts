//rota para logout 

export async function POST() {
    // remove o token do lado do cliente
    return new Response(
        JSON.stringify({ status: 204, message: "Logout realizado com sucesso" }),
        { status: 204, headers: { "Content-Type": "application/json" } }
    );
}