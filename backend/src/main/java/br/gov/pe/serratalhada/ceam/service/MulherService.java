package br.gov.pe.serratalhada.ceam.service;

import br.gov.pe.serratalhada.ceam.domain.entity.Mulher;
import br.gov.pe.serratalhada.ceam.repository.MulherRepository;
import br.gov.pe.serratalhada.ceam.web.dto.MulherRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class MulherService {

    private final MulherRepository mulherRepository;
    private final DominioService dominioService;

    public MulherService(MulherRepository mulherRepository, DominioService dominioService) {
        this.mulherRepository = mulherRepository;
        this.dominioService = dominioService;
    }

    @Transactional(readOnly = true)
    public List<Mulher> listarTodas() {
        return mulherRepository.findAll();
    }

    @Transactional
    public Mulher cadastrar(MulherRequest request) {
        if (mulherRepository.findByCpf(request.cpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado no sistema.");
        }

        Mulher mulher = new Mulher();
        mulher.setNome(request.nome());
        mulher.setCpf(request.cpf());
        mulher.setRg(request.rg());
        mulher.setDataNascimento(request.dataNascimento());
        mulher.setTelefone(request.telefone());
        mulher.setEnderecoLogradouro(request.enderecoLogradouro());
        mulher.setNumero(request.numero());
        mulher.setBairro(dominioService.buscarBairroPorId(request.bairroId()));
        mulher.setProfissao(dominioService.buscarProfissaoPorId(request.profissaoId()));

        return mulherRepository.save(mulher);
    }

    @Transactional(readOnly = true)
    public Mulher buscarPorId(UUID id) {
        return mulherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mulher não encontrada"));
    }
}
