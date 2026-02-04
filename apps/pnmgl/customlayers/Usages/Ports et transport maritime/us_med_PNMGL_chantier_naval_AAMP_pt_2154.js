
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Ports et transport maritime/us_med_PNMGL_chantier_naval_AAMP_pt_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/2.svg",
            scale: 1, 
        })
    }),
    
});


// Fonction pour transformer les géométries en EPSG
layer.getSource().on('addfeature', function(event) {
    const feature = event.feature;
    const geometry = feature.getGeometry();
    
    if (geometry) {
        // Transformation de la géométrie de EPSG:2154 vers EPSG:3857
        geometry.transform('EPSG:2154', 'EPSG:3857');
    }
});

new CustomLayer('us_med_PNMGL_chantier_naval_AAMP_pt_2154', layer);
