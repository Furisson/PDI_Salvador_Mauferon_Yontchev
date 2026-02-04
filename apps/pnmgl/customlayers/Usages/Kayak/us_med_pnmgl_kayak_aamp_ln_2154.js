
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Kayak/us_med_pnmgl_kayak_aamp_ln_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgb(0, 0, 0)", 
            width: 2, 
            lineDash: [5, 5] 
        })
    })
});

new CustomLayer('us_med_pnmgl_kayak_aamp_ln_2154', layer);
