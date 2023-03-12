import { useAuth } from "./security/AuthContext";

function FooterComponent() {

    const authContext = useAuth();
    console.log(`FooterComponent - ${authContext.number}`);

    return (
        <footer className="footer">
            <div className="container">
                Footer
            </div>
        </footer>
    )
}

export default FooterComponent;