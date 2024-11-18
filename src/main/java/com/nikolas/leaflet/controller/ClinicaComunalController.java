package com.nikolas.leaflet.controller;

import java.util.ArrayList;
import java.util.List;
import com.nikolas.leaflet.domain.ClinicaComunal;
import com.nikolas.leaflet.service.ClinicaComunalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nikolas.leaflet.dto.BusquedaDTO;

@RestController
@RequestMapping("/clinicaComunal")
public class ClinicaComunalController {

    @Autowired
    private ClinicaComunalService ClinicaComunalService;

    @PostMapping("/buscar")
    public ResponseEntity<List<ClinicaComunal>> getClinicasByMunicipio(@RequestBody BusquedaDTO busqueda) {
        List<ClinicaComunal> clinicas = ClinicaComunalService.buscarPorMunicipio(busqueda.getMunicipio());
        if (clinicas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clinicas);
    }

    @PostMapping("/municipios")
    public ResponseEntity<List<String>> getDistinctMunicipios() {
        List<String> municipios = ClinicaComunalService.getDistinctMunicipios();
        if (municipios.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(municipios);
    }

    @PostMapping("/buscarm")
    public ResponseEntity<List<ClinicaComunal>> getClinicasByMunicipios(@RequestBody List<String> municipio) {
        List<ClinicaComunal> clinicas = new ArrayList<>();
        for (String municipios : municipio) {
            clinicas.addAll(ClinicaComunalService.buscarPorMunicipio(municipios));
        }
        if (clinicas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clinicas);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClinicaComunal>> getAllClinicas() {
        List<ClinicaComunal> clinicas = ClinicaComunalService.clinicaComunalGetAll();
        if (clinicas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clinicas);
    }

    @PostMapping("/add")
    public ResponseEntity<ClinicaComunal> addClinicaComunal(@RequestBody ClinicaComunal clinicaComunal) {
        ClinicaComunal clinica = ClinicaComunalService.addClinicaComunal(clinicaComunal);
        return ResponseEntity.ok(clinica);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteClinicaComunal(@PathVariable Integer id) {
        ClinicaComunalService.deleteClinicaComunal(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<ClinicaComunal> updateClinicaComunal(@RequestBody ClinicaComunal clinicaComunal) {
        ClinicaComunal clinica = ClinicaComunalService.updateClinicaComunal(clinicaComunal.getId(), clinicaComunal);
        return ResponseEntity.ok(clinica);
    }

}