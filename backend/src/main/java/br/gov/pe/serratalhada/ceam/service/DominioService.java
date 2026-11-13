package br.gov.pe.serratalhada.ceam.service;

import br.gov.pe.serratalhada.ceam.domain.entity.*;
import br.gov.pe.serratalhada.ceam.repository.*;
import br.gov.pe.serratalhada.ceam.web.dto.DominioRequest;
import br.gov.pe.serratalhada.ceam.web.dto.DominioResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DominioService {

    private final BairroRepository bairroRepository;
    private final ProfissaoRepository profissaoRepository;
    private final TipoAtendimentoRepository tipoAtendimentoRepository;
    private final TipoViolenciaRepository tipoViolenciaRepository;
    private final VinculoAgressorRepository vinculoAgressorRepository;
    private final OrgaoEncaminhamentoRepository orgaoEncaminhamentoRepository;

    public DominioService(
            BairroRepository br,
            ProfissaoRepository pr,
            TipoAtendimentoRepository tar,
            TipoViolenciaRepository tvr,
            VinculoAgressorRepository var,
            OrgaoEncaminhamentoRepository oer
    ) {
        this.bairroRepository = br;
        this.profissaoRepository = pr;
        this.tipoAtendimentoRepository = tar;
        this.tipoViolenciaRepository = tvr;
        this.vinculoAgressorRepository = var;
        this.orgaoEncaminhamentoRepository = oer;
    }

    // ==================== BAIRROS ====================

    @Transactional(readOnly = true)
    public List<DominioResponse> listarBairros() {
        return listarBairros(null);
    }

    @Transactional(readOnly = true)
    public List<DominioResponse> listarBairros(Boolean apenasAtivos) {
        List<Bairro> bairros = Boolean.TRUE.equals(apenasAtivos)
                ? bairroRepository.findByAtivoTrueOrderByDescricaoAsc()
                : bairroRepository.findAllByOrderByDescricaoAsc();

        return bairros.stream()
                .map(b -> new DominioResponse(b.getId(), b.getDescricao(), b.getAtivo()))
                .collect(Collectors.toList());
    }

    @Transactional
    public DominioResponse criarBairro(DominioRequest request) {
        Bairro bairro = new Bairro();
        bairro.setDescricao(request.descricao().trim());
        bairro.setAtivo(request.ativoOuPadrao());
        Bairro salvo = bairroRepository.save(bairro);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    @Transactional
    public DominioResponse alterarStatusBairro(Long id, Boolean status) {
        Bairro bairro = buscarBairroPorId(id);
        bairro.setAtivo(status != null ? status : !Boolean.TRUE.equals(bairro.getAtivo()));
        Bairro salvo = bairroRepository.save(bairro);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    @Transactional
    public DominioResponse atualizarBairro(Long id, DominioRequest request) {
        Bairro bairro = buscarBairroPorId(id);
        bairro.setDescricao(request.descricao().trim());
        if (request.ativo() != null) {
            bairro.setAtivo(request.ativo());
        }
        Bairro salvo = bairroRepository.save(bairro);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    @Transactional(readOnly = true)
    public Bairro buscarBairroPorId(Long id) {
        return bairroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bairro não encontrado com ID: " + id));
    }

    // ==================== PROFISSÕES ====================

    @Transactional(readOnly = true)
    public List<DominioResponse> listarProfissoes() {
        return listarProfissoes(null);
    }

    @Transactional(readOnly = true)
    public List<DominioResponse> listarProfissoes(Boolean apenasAtivos) {
        List<Profissao> profissoes = Boolean.TRUE.equals(apenasAtivos)
                ? profissaoRepository.findByAtivoTrueOrderByDescricaoAsc()
                : profissaoRepository.findAllByOrderByDescricaoAsc();

        return profissoes.stream()
                .map(p -> new DominioResponse(p.getId(), p.getDescricao(), p.getAtivo()))
                .collect(Collectors.toList());
    }

    @Transactional
    public DominioResponse criarProfissao(DominioRequest request) {
        Profissao profissao = new Profissao();
        profissao.setDescricao(request.descricao().trim());
        profissao.setAtivo(request.ativoOuPadrao());
        Profissao salva = profissaoRepository.save(profissao);
        return new DominioResponse(salva.getId(), salva.getDescricao(), salva.getAtivo());
    }

    @Transactional
    public DominioResponse alterarStatusProfissao(Long id, Boolean status) {
        Profissao profissao = buscarProfissaoPorId(id);
        profissao.setAtivo(status != null ? status : !Boolean.TRUE.equals(profissao.getAtivo()));
        Profissao salva = profissaoRepository.save(profissao);
        return new DominioResponse(salva.getId(), salva.getDescricao(), salva.getAtivo());
    }

    @Transactional
    public DominioResponse atualizarProfissao(Long id, DominioRequest request) {
        Profissao profissao = buscarProfissaoPorId(id);
        profissao.setDescricao(request.descricao().trim());
        if (request.ativo() != null) {
            profissao.setAtivo(request.ativo());
        }
        Profissao salva = profissaoRepository.save(profissao);
        return new DominioResponse(salva.getId(), salva.getDescricao(), salva.getAtivo());
    }

    @Transactional(readOnly = true)
    public Profissao buscarProfissaoPorId(Long id) {
        return profissaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profissão não encontrada com ID: " + id));
    }

    // ==================== TIPOS DE ATENDIMENTO ====================

    @Transactional(readOnly = true)
    public List<DominioResponse> listarTiposAtendimento() {
        return listarTiposAtendimento(null);
    }

    @Transactional(readOnly = true)
    public List<DominioResponse> listarTiposAtendimento(Boolean apenasAtivos) {
        List<TipoAtendimento> tipos = Boolean.TRUE.equals(apenasAtivos)
                ? tipoAtendimentoRepository.findByAtivoTrueOrderByDescricaoAsc()
                : tipoAtendimentoRepository.findAllByOrderByDescricaoAsc();

        return tipos.stream()
                .map(t -> new DominioResponse(t.getId(), t.getDescricao(), t.getAtivo()))
                .collect(Collectors.toList());
    }

    @Transactional
    public DominioResponse criarTipoAtendimento(DominioRequest request) {
        TipoAtendimento tipo = new TipoAtendimento();
        tipo.setDescricao(request.descricao().trim());
        tipo.setAtivo(request.ativoOuPadrao());
        TipoAtendimento salvo = tipoAtendimentoRepository.save(tipo);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    @Transactional
    public DominioResponse alterarStatusTipoAtendimento(Long id, Boolean status) {
        TipoAtendimento tipo = tipoAtendimentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de atendimento não encontrado com ID: " + id));
        tipo.setAtivo(status != null ? status : !Boolean.TRUE.equals(tipo.getAtivo()));
        TipoAtendimento salvo = tipoAtendimentoRepository.save(tipo);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    @Transactional
    public DominioResponse atualizarTipoAtendimento(Long id, DominioRequest request) {
        TipoAtendimento tipo = tipoAtendimentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de atendimento não encontrado com ID: " + id));
        tipo.setDescricao(request.descricao().trim());
        if (request.ativo() != null) {
            tipo.setAtivo(request.ativo());
        }
        TipoAtendimento salvo = tipoAtendimentoRepository.save(tipo);
        return new DominioResponse(salvo.getId(), salvo.getDescricao(), salvo.getAtivo());
    }

    // ==================== OUTROS DOMÍNIOS ====================

    @Transactional(readOnly = true)
    public List<DominioResponse> listarTiposViolencia(Boolean apenasAtivos) {
        List<TipoViolencia> lista = Boolean.TRUE.equals(apenasAtivos)
                ? tipoViolenciaRepository.findByAtivoTrueOrderByDescricaoAsc()
                : tipoViolenciaRepository.findAllByOrderByDescricaoAsc();

        return lista.stream()
                .map(t -> new DominioResponse(t.getId(), t.getDescricao(), t.getAtivo()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DominioResponse> listarVinculosAgressor(Boolean apenasAtivos) {
        List<VinculoAgressor> lista = Boolean.TRUE.equals(apenasAtivos)
                ? vinculoAgressorRepository.findByAtivoTrueOrderByDescricaoAsc()
                : vinculoAgressorRepository.findAllByOrderByDescricaoAsc();

        return lista.stream()
                .map(v -> new DominioResponse(v.getId(), v.getDescricao(), v.getAtivo()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DominioResponse> listarOrgaosEncaminhamento(Boolean apenasAtivos) {
        List<OrgaoEncaminhamento> lista = Boolean.TRUE.equals(apenasAtivos)
                ? orgaoEncaminhamentoRepository.findByAtivoTrueOrderByDescricaoAsc()
                : orgaoEncaminhamentoRepository.findAllByOrderByDescricaoAsc();

        return lista.stream()
                .map(o -> new DominioResponse(o.getId(), o.getDescricao(), o.getAtivo()))
                .collect(Collectors.toList());
    }
}
