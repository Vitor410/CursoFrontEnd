"use-client";

import { LocaleRouteNormalizer } from "next/dist/server/normalizers/locale-route-normalizer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardGerente from "../componentes/DashboardGerente";
import DashboardAdmin from "../componentes/DashboardAdim";
import DashboardTecnico from "../componentes/DashboardTecnico";

export default function DashboardPage(){
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(()=>{
        const role = localStorage.getItem("userRole");
        if(!role) {
            router.push("/login");//redireciona para o login caso perca a userRole
        }else{
            setUserRole(role);
        }
    });

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        router.push("/login");
    };

    const renderDashboard = () => {
        if( userRole?.toLowerCase() === "admin"){
            return <DashboardAdmin />;
        } else if (userRole === "gerente") {
            return <DashboardGerente />;
        } else if (userRole === "tecnico"){
            return <DashboardTecnico />;
        }
    };

    return (
        <div>
            <header>
                <h1>Bem-Vindo</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                {renderDashboard()}
            </main>
        </div>
    )

}