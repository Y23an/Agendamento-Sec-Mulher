package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.domain.entity.Atendimento;
import br.gov.pe.serratalhada.ceam.service.AtendimentoService;
import br.gov.pe.serratalhada.ceam.web.dto.AtendimentoRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/atendimentos")
public class AtendimentoController {

    private final AtendimentoService atendimentoService;

    public AtendimentoController(AtendimentoService atendimentoService) {
        this.atendimentoService = atendimentoService;
    }

    @PostMapping
    public ResponseEntity<Atendimento> registrar(@RequestBody @Valid AtendimentoRequest request) {
        Atendimento atendimento = atendimentoService.registrarAtendimento(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimento);
    }

    @GetMapping
    public ResponseEntity<List<Atendimento>> listarTodos() {
        return ResponseEntity.ok(atendimentoService.listarTodos());
    }

    @GetMapping("/mulher/{mulherId}")
    public ResponseEntity<List<Atendimento>> listarPorMulher(@PathVariable UUID mulherId) {
        return ResponseEntity.ok(atendimentoService.listarPorMulher(mulherId));
    }
}
