import React from "react";

interface BlankPageProps {
    title: string;
}

const BlankPage: React.FC<BlankPageProps> = ({ title }) => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>{title}</h1>
            <p>Bu sayfa şu anda boş. Daha sonra içeriği ekleyebilirsiniz.</p>
        </div>
    );
};

export default BlankPage;
