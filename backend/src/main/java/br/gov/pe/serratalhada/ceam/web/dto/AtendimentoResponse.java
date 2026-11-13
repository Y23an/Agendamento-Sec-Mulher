package br.gov.pe.serratalhada.ceam.web.dto;
import br.gov.pe.serratalhada.ceam.domain.enums.StatusAtendimento;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record AtendimentoResponse(
    UUID id, 
    String protocolo, 
    LocalDateTime dataAtendimento, 
    String relatoVitima, 
    String providenciasTomadas, 
    StatusAtendimento status,
    DominioResponse vinculoAgressor, 
    List<DominioResponse> tiposViolencia
) {}
