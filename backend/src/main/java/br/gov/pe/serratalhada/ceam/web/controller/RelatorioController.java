package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.service.RelatorioService;
import br.gov.pe.serratalhada.ceam.web.dto.MetricasResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping("/metricas")
    public ResponseEntity<MetricasResponse> obterMetricas() {
        return ResponseEntity.ok(relatorioService.obterMetricas());
    }
}
