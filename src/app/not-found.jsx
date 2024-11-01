
import Link from 'next/link';


export default function NotFound() {
    return (
        <div className="containertwo">
            <div className="nexterror">
                <h1 className="pulse">404</h1>
                <p>Page Not Found</p>
                <Link href="/">
                    <button className="homeButton">Go Back Home</button>
                </Link>
            </div>
        </div>
    );
}
