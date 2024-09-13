import Application from './Application';
import SocketContextComponent from './contexts/SocketContextComponent';

function LeafletAppEntryPoint() {
    return (
        <SocketContextComponent>
            <Application />
        </SocketContextComponent>
    );
}

export default LeafletAppEntryPoint;
