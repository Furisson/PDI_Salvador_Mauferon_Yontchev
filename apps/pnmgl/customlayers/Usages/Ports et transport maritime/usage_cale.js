
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Ports et transport maritime/usage_cale.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/1.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('usage_cale', layer);
