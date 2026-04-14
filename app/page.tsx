import Link from "next/link";

export default function Home(){
    return(
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Machine Learning Huh</h1>
            <p>A simple platformusing Supabase and Vercel.</p>

            <Link href="/auth">
                <button>Get Started</button>
            </Link>
        </div>
    );
}