
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/ZEE Mediterranee/ges_med_pnmgl_Decret_delimitation_ZEE_pt_3857.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/3.svg", 
            scale: 0.7, 
        })
    }),
});

new CustomLayer('ges_med_pnmgl_Decret_delimitation_ZEE_pt_3857', layer);
