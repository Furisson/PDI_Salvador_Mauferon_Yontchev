
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Recifs/us_med_pnmgl_recif_art_fond_aamp_ixsurvey_pol_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(255, 157, 11)",
          width: 1,
        }),
        fill: new ol.style.Stroke({
            color: "rgba(255, 157, 11, 0)",
            width: 1,
          }),
    }),
});

new CustomLayer('us_med_pnmgl_recif_art_fond_aamp_ixsurvey_pol_2154', layer);
