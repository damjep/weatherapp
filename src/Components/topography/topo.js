export default function Topo() {
    const mapContent = `
        <style>
            /* Add your custom styles here */
            /* For example, hide certain elements */
            /* Specify the parts you want to display */
            .map-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
            .map { width: 100%; height: 100%; }
        </style>
        <div class="map-container">
            <iframe class="map" src="https://en-gb.topographic-map.com/map-kb57/England/?center=50.90671%2C-0.63699&zoom=14&popup=50.90241%2C-0.64785" frameborder="0" scrolling="no"></iframe>
        </div>
    `;

    return (
        <div style={{ width: '600px', height: '600px', overflow: 'hidden' }}>
            <iframe
                srcDoc={mapContent}
                title="Topographic Map"
                sandbox="allow-same-origin allow-scripts"
                width='100%'
                height='100%'
            />
        </div>
    );
}
