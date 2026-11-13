package br.gov.pe.serratalhada.ceam.web.controller;

import br.gov.pe.serratalhada.ceam.service.DominioService;
import br.gov.pe.serratalhada.ceam.web.dto.DominioRequest;
import br.gov.pe.serratalhada.ceam.web.dto.DominioResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dominios")
public class DominioController {

    private final DominioService dominioService;

    public DominioController(DominioService dominioService) {
        this.dominioService = dominioService;
    }

    // ==================== BAIRROS ====================

    @GetMapping("/bairros")
    public ResponseEntity<List<DominioResponse>> listarBairros(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarBairros(apenasAtivos));
    }

    @PostMapping("/bairros")
    public ResponseEntity<DominioResponse> criarBairro(
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dominioService.criarBairro(request));
    }

    @PutMapping("/bairros/{id}/status")
    public ResponseEntity<DominioResponse> alterarStatusBairro(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Boolean> body
    ) {
        Boolean status = body != null ? body.get("ativo") : null;
        return ResponseEntity.ok(dominioService.alterarStatusBairro(id, status));
    }

    @PutMapping("/bairros/{id}")
    public ResponseEntity<DominioResponse> atualizarBairro(
            @PathVariable Long id,
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.ok(dominioService.atualizarBairro(id, request));
    }

    // ==================== PROFISSÕES ====================

    @GetMapping("/profissoes")
    public ResponseEntity<List<DominioResponse>> listarProfissoes(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarProfissoes(apenasAtivos));
    }

    @PostMapping("/profissoes")
    public ResponseEntity<DominioResponse> criarProfissao(
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dominioService.criarProfissao(request));
    }

    @PutMapping("/profissoes/{id}/status")
    public ResponseEntity<DominioResponse> alterarStatusProfissao(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Boolean> body
    ) {
        Boolean status = body != null ? body.get("ativo") : null;
        return ResponseEntity.ok(dominioService.alterarStatusProfissao(id, status));
    }

    @PutMapping("/profissoes/{id}")
    public ResponseEntity<DominioResponse> atualizarProfissao(
            @PathVariable Long id,
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.ok(dominioService.atualizarProfissao(id, request));
    }

    // ==================== TIPOS DE ATENDIMENTO ====================

    @GetMapping("/tipos-atendimento")
    public ResponseEntity<List<DominioResponse>> listarTiposAtendimento(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarTiposAtendimento(apenasAtivos));
    }

    @PostMapping("/tipos-atendimento")
    public ResponseEntity<DominioResponse> criarTipoAtendimento(
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dominioService.criarTipoAtendimento(request));
    }

    @PutMapping("/tipos-atendimento/{id}/status")
    public ResponseEntity<DominioResponse> alterarStatusTipoAtendimento(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Boolean> body
    ) {
        Boolean status = body != null ? body.get("ativo") : null;
        return ResponseEntity.ok(dominioService.alterarStatusTipoAtendimento(id, status));
    }

    @PutMapping("/tipos-atendimento/{id}")
    public ResponseEntity<DominioResponse> atualizarTipoAtendimento(
            @PathVariable Long id,
            @Valid @RequestBody DominioRequest request
    ) {
        return ResponseEntity.ok(dominioService.atualizarTipoAtendimento(id, request));
    }

    // ==================== OUTROS DOMÍNIOS ====================

    @GetMapping("/tipos-violencia")
    public ResponseEntity<List<DominioResponse>> listarTiposViolencia(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarTiposViolencia(apenasAtivos));
    }

    @GetMapping("/vinculos-agressor")
    public ResponseEntity<List<DominioResponse>> listarVinculosAgressor(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarVinculosAgressor(apenasAtivos));
    }

    @GetMapping("/orgaos-encaminhamento")
    public ResponseEntity<List<DominioResponse>> listarOrgaosEncaminhamento(
            @RequestParam(required = false) Boolean apenasAtivos
    ) {
        return ResponseEntity.ok(dominioService.listarOrgaosEncaminhamento(apenasAtivos));
    }
}
