package com.projeto.faceBuy.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.projeto.faceBuy.entities.Categoria;
import com.projeto.faceBuy.entities.Cidade;
import com.projeto.faceBuy.entities.CotacaoCompra;
import com.projeto.faceBuy.entities.CotacaoCompraItem;
import com.projeto.faceBuy.entities.Estado;
import com.projeto.faceBuy.entities.Fornecedor;
import com.projeto.faceBuy.entities.Funcionario;
import com.projeto.faceBuy.entities.NotaFiscal;
import com.projeto.faceBuy.entities.NotaFiscalItem;
import com.projeto.faceBuy.entities.OrdemCompra;
import com.projeto.faceBuy.entities.OrdemCompraItem;
import com.projeto.faceBuy.entities.Produto;
import com.projeto.faceBuy.entities.TipoFuncionario;
import com.projeto.faceBuy.repositories.CategoriaRepository;
import com.projeto.faceBuy.repositories.CidadeRepository;
import com.projeto.faceBuy.repositories.CotacaoCompraItemRepository;
import com.projeto.faceBuy.repositories.CotacaoCompraRepository;
import com.projeto.faceBuy.repositories.EstadoRepository;
import com.projeto.faceBuy.repositories.FornecedorRepository;
import com.projeto.faceBuy.repositories.FuncionarioRepository;
import com.projeto.faceBuy.repositories.NotaFiscalItemRepository;
import com.projeto.faceBuy.repositories.NotaFiscalRepository;
import com.projeto.faceBuy.repositories.OrdemCompraItemRepository;
import com.projeto.faceBuy.repositories.OrdemCompraRepository;
import com.projeto.faceBuy.repositories.ProdutoRepository;
import com.projeto.faceBuy.repositories.TipoFuncionarioRepository;

@Configuration
@Profile ("test")
public class TestConfig implements  CommandLineRunner{
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	
    @Autowired 
    private ProdutoRepository produtorepository;
    @Autowired
    private FornecedorRepository fornecedorrepository;
    @Autowired
    private CidadeRepository cidaderepository;
    @Autowired
    private EstadoRepository estadorepository;
    @Autowired
    private FuncionarioRepository funcionariorepository;
    @Autowired
    private NotaFiscalRepository nfrepository;
    @Autowired
    private NotaFiscalItemRepository nfitemrepository;
    @Autowired
    private OrdemCompraRepository ocrepository;
    @Autowired
    private OrdemCompraItemRepository ocitemrepository;
    @Autowired
    private TipoFuncionarioRepository tiporepository;
    @Autowired
    private CotacaoCompraRepository cotacomrepository;
    @Autowired
    private CotacaoCompraItemRepository cotaitensrepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Override
	public void run(String... args) throws Exception {
    	Categoria cate1 = new Categoria();
    	cate1.setNome("Tecnologia");
    	Categoria cate2 = new Categoria();
    	cate2.setNome("Materiais de Escritório");
    	Categoria cate3 = new Categoria();
    	cate3.setNome("Acessórios para Escritório");
    	categoriaRepository.saveAll(Arrays.asList(cate1,cate2,cate3));
    	Produto p = new Produto();
        p.setNome("Monitor");
        p.setDescrição("Monitor para os computadores do escritório");
        p.setQuantidademin(5);
        p.setEstoque(13);
        p.setCategoria(cate1);
        Produto p2 = new Produto();
        p2.setNome("Agenda");
        p2.setDescrição("Agenda para os funcionários marcarem seus compromissos");
        p2.setQuantidademin(11);
        p2.setEstoque(35);
        p2.setCategoria(cate2);
        Produto p3 = new Produto();
        p3.setNome("Post-it");
        p3.setDescrição("Post-it para marcar compromissos e colar em locais para lembrar");
        p3.setQuantidademin(20);
        p3.setEstoque(52);
        p3.setCategoria(cate2);
        Produto p4 = new Produto();
        p4.setNome("Calendário");
        p4.setDescrição("Calendário para visualizar as datas");
        p4.setQuantidademin(8);
        p4.setEstoque(11);
        p4.setCategoria(cate3);
        Produto p5 = new Produto();
        p5.setNome("Teclado");
        p5.setDescrição("Teclado para funcionários utilizarem em suas mesas");
        p5.setQuantidademin(4);
        p5.setEstoque(9);
        p5.setCategoria(cate1);
        produtorepository.saveAll(Arrays.asList(p,p2,p3,p4,p5));
        TipoFuncionario tipo = new TipoFuncionario();
        tipo.setTipo("Funcionario");
        TipoFuncionario tipo2 = new TipoFuncionario();
        tipo2.setTipo("Gerente");
        tiporepository.saveAll(Arrays.asList(tipo,tipo2));
        Fornecedor f = new Fornecedor();
        Fornecedor f2 = new Fornecedor();
        Fornecedor f3 = new Fornecedor();
        f.setCnpj("41562");
        f.setNome("Ponto Frio");
        f.setLogin("ponto123");
        f.setSenha("frio123");
        f.setEmail("pontofrio@gmail.com");
        f2.setCnpj("4124122");
        f2.setNome("Casas Bahia");
        f2.setLogin("casas123");
        f2.setSenha("bahia123");
        f2.setEmail("casasbahia@gmail.com");
        f3.setCnpj("4412432r42");
        f3.setNome("Americanas");
        f3.setLogin("americanas123");
        f3.setSenha("todomundovai");
        f3.setEmail("americanas@gmail.com");
        Cidade c = new Cidade();
        Cidade c2 = new Cidade();
        c.setNome("Araucária");
        c2.setNome("Maringa");
        Estado e = new Estado();
        e.setNome("Paraná");
        f.setCidade(c);
        f2.setCidade(c);
        f3.setCidade(c2);
        c.getFornecedores().add(f);
        c.getFornecedores().add(f2);
        c2.getFornecedores().add(f3);
        estadorepository.save(e);
        c.setEstado(e);
        c2.setEstado(e);
        cidaderepository.saveAll(Arrays.asList(c,c2));
        fornecedorrepository.saveAll(Arrays.asList(f,f2,f3));
        c.getFornecedores().add(f);
        c.getFornecedores().add(f2);
        c2.getFornecedores().add(f3);
        e.getCidades().add(c2);
        e.getCidades().add(c);
        cidaderepository.saveAll(Arrays.asList(c,c2));
        estadorepository.save(e);
        Funcionario func = new Funcionario();
        func.setEmail("vini@gmail.com");
        func.setLogin("vini030902");
        func.setNome("Vinicius Crispim de Azevedo");
        func.setSenha("123");
        func.setTelefone("45689-77778");
        func.setTipo(tipo2);
        Funcionario func2 = new Funcionario();
        func2.setEmail("ma.tuzalen@gmail.com");
        func2.setLogin("mat0209");
        func2.setNome("Matheus Pinheiro dos Santos");
        func2.setSenha("mat234");
        func2.setTelefone("98031-3124");
        func2.setTipo(tipo);
        funcionariorepository.saveAll(Arrays.asList(func,func2));
        NotaFiscal nf = new NotaFiscal();
        nf.setData(sdf.parse("10/05/2021"));
        nf.setFornecedor(f);
        nf.setValorTotal(10000.0);
        nf.setNum_nota(23);
        NotaFiscal nf2 = new NotaFiscal();
        nf2.setData(sdf.parse("20/02/2021"));
        nf2.setFornecedor(f3);
        nf2.setValorTotal(2210.0);
        nf2.setNum_nota(12);
        nfrepository.save(nf);
        nfrepository.save(nf2);
        f.getNotasfiscais().add(nf);
        f3.getNotasfiscais().add(nf2);
        OrdemCompra oc = new OrdemCompra();
        oc.setData(sdf.parse("09/05/2021"));
        oc.setFornecedor(f);
        oc.setValor(10000.0);
        ocrepository.save(oc);
        OrdemCompra oc2 = new OrdemCompra();
        oc2.setData(sdf.parse("18/02/2021"));
        oc2.setFornecedor(f3);
        oc2.setValor(2210.0);
        ocrepository.save(oc2);
        f.getOrdenscompra().add(oc);
        f3.getOrdenscompra().add(oc2);
        fornecedorrepository.save(f);
        fornecedorrepository.save(f3);
        func.setTipo(tipo);
        func2.setTipo(tipo2);
        funcionariorepository.saveAll(Arrays.asList(func,func2));
        CotacaoCompra coco = new CotacaoCompra();
        coco.setFornecedor(f);
        cotacomrepository.save(coco);
        CotacaoCompraItem cotaitens =  new CotacaoCompraItem(2,"BMW",p,coco,func); 
        CotacaoCompraItem cotaitens2 =  new CotacaoCompraItem(2,"Honda",p2,coco,func);
        cotaitensrepository.saveAll(Arrays.asList(cotaitens,cotaitens2));
        coco.getCotacaocompraitem().add(cotaitens);       
        OrdemCompraItem ordemcompraitens = new OrdemCompraItem(4,4500.0,p,oc);
        ocitemrepository.save(ordemcompraitens);
        NotaFiscalItem notafiscalitem = new NotaFiscalItem(4,4500.0,p,nf);
        nfitemrepository.save(notafiscalitem);
        OrdemCompraItem ordemcompraitens2 = new OrdemCompraItem(2,2210.0,p2,oc2);
        ocitemrepository.save(ordemcompraitens2);
        NotaFiscalItem notafiscalitem2 = new NotaFiscalItem(2,2210.0,p2,nf2);
        nfitemrepository.save(notafiscalitem2);
//        func.setNome("Davi Lima");
//        funcionariorepository.save(func);
//        fornecedorrepository.delete(f3);
    }
}
