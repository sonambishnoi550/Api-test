import { GetServerSideProps } from 'next';
import MyApiTable from '@/components/MyApiTable'

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await fetch('http://universities.hipolabs.com/search?name=middle');
        const universities = await res.json();

        return { props: { universities } };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { props: { universities: [] } };
    }
};

const DashboardPage = ({ universities }: { universities: any[] }) => {
    return <MyApiTable universities={universities} />;
};

export default DashboardPage;