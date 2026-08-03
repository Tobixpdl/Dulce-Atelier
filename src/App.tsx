import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, CakeSlice, ChevronDown, Clock3, MapPin, MessageCircle, Search, Sparkles, Store, Truck } from 'lucide-react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { products } from './data/products';
import { businessConfig } from './config/business';
import { useScrollEffects } from './hooks/useScrollEffects';
import type { CartItem, Category, Product } from './types';

const categories: ['Todos' | Category, ...Category[]] = ['Todos', 'Tortas clásicas', 'Personalizadas', 'Porciones', 'Boxes', 'Individuales'];
const faqs = [
  ['¿Con cuánta anticipación debo pedir?', 'Los productos simples requieren 48 horas, las tortas clásicas 72 horas y las personalizadas al menos 7 días. Para eventos complejos recomendamos 14 días.'],
  ['¿El pedido queda confirmado al enviarlo?', 'No. Primero validamos fecha, diseño, precio y forma de pago. Recién entonces coordinamos la entrega o el retiro.'],
  ['¿Puedo enviar una foto de referencia?', 'Sí. Cuando se abra WhatsApp podés mandarnos referencias. Se usan como guía: cada terminación conserva las variaciones propias del trabajo artesanal.'],
  ['¿Hacen envíos?', 'Coordinamos envíos en Zona Norte y alrededores, o retiro una vez confirmado el pedido. El costo se informa en el resumen estimado.'],
  ['¿Tienen opciones especiales?', 'Consultá disponibilidad y condiciones de elaboración antes de hacer el pedido. No declaramos productos aptos para celíacos u otras necesidades sin confirmación previa.']
];

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => { try { return JSON.parse(localStorage.getItem('dulce-atelier-cart') || '[]'); } catch { return []; } });
  const [selected, setSelected] = useState<Product | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<'Todos' | Category>('Todos');
  const [query, setQuery] = useState('');
  useScrollEffects();
  useEffect(() => localStorage.setItem('dulce-atelier-cart', JSON.stringify(cart)), [cart]);
  const visible = useMemo(() => products.filter((p) => (filter === 'Todos' || p.category === filter) && `${p.name} ${p.description}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [filter, query]);
  const pick = (item: CartItem) => { setCart((current) => [...current, item]); setDrawer(true); };
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const featured = ['minimal', 'matilda', 'box', 'cookie'].map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  return <>
    <Header count={cart.reduce((total, item) => total + item.quantity, 0)} onCart={() => setDrawer(true)} open={menu} setOpen={setMenu} />
    <main>
      <section id="inicio" className="atelier-hero">
        <img className="hero-photo parallax" data-speed=".14" src="/images/hero/hero.webp" alt="Torta artesanal sobre pedestal, preparada para una celebración" width="1920" height="1080" fetchPriority="high" />
        <div className="hero-wash" />
        <div className="hero-editorial reveal reveal-delay">
          <p className="kicker">Pastelería por encargo</p>
          <h1>Piezas dulces<br />para fechas concretas.</h1>
          <p className="hero-description">Tortas, boxes y detalles preparados según la celebración, la fecha y cada pedido.</p>
          <div className="editorial-actions"><button className="button primary" onClick={() => go('coleccion')}>Ver la colección <ArrowDownRight /></button><button className="underlined-link" onClick={() => go('personalizadas')}>Diseñar una torta</button></div>
          <p className="hero-note">Trabajamos con anticipación.<br />La disponibilidad se confirma por WhatsApp.</p>
        </div>
      </section>

      <section className="manifesto reveal">
        <p className="section-number">01 — EL ATELIER</p><div className="manifesto-rule" />
        <h2>Producción pequeña, por pedido y con tiempo para mirar cada terminación.</h2>
        <p>Organizamos cada encargo según la fecha, el tamaño y el tipo de celebración. Eso nos permite trabajar sabores, capas y detalles con el cuidado que necesitan.</p>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-intro reveal"><p className="section-number">02 — SELECCIÓN</p><h2 id="featured-title">Lo que estamos preparando.</h2><button className="underlined-link" onClick={() => go('coleccion')}>Ver catálogo completo <ArrowRight /></button></div>
        <div className="featured-editorial">{featured.map((product, index) => <button key={product.id} className={`featured-piece piece-${index + 1} reveal`} onClick={() => setSelected(product)}><img src={product.image} alt={product.alt} width="800" height="1000" loading="lazy" /><span className="featured-copy"><small>{product.category}</small><b>{product.name}</b><i>{product.custom ? 'Precio desde' : 'Ver detalles'}</i></span></button>)}</div>
      </section>

      <section id="coleccion" className="collection-section">
        <div className="collection-heading reveal"><div><p className="section-number">03 — COLECCIÓN</p><h2>Elegí una pieza, después definimos los detalles.</h2></div><p>Los precios de las tortas personalizadas son estimados y quedan sujetos a confirmación.</p></div>
        <div className="collection-tools reveal"><div className="filters" aria-label="Filtrar productos">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div><label className="search"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en la colección" aria-label="Buscar productos" /></label></div>
        <div className="product-grid">{visible.map((product, index) => <div className={`reveal catalog-piece catalog-piece-${index % 5}`} key={product.id}><ProductCard product={product} onSelect={setSelected} /></div>)}</div>
        {!visible.length && <p className="no-results">No encontramos una pieza con esa búsqueda.</p>}
      </section>

      <section id="personalizadas" className="custom-editorial">
        <div className="custom-image-wrap reveal"><img className="parallax" data-speed=".08" src="/images/gallery/custom-cake.webp" alt="Torta personalizada con terminaciones artesanales" width="1200" height="1400" loading="lazy" /><span>Diseños a medida<br />desde $35.000</span></div>
        <div className="custom-copy reveal"><p className="section-number">04 — TORTAS PERSONALIZADAS</p><h2>Una idea, una fecha y una torta hecha para esa ocasión.</h2><p>Elegís porciones, sabor y relleno. Después nos contás el evento, el estilo y las referencias que querés compartir.</p><ol>{['Elegí tamaño, sabor y relleno.', 'Indicá evento y estilo.', 'Seleccioná la fecha solicitada.', 'Mandanos referencias por WhatsApp.', 'Confirmamos disponibilidad y presupuesto.'].map((step, index) => <li key={step}><b>0{index + 1}</b><span>{step}</span></li>)}</ol><p className="fine-print">La fecha, el diseño y el precio final quedan sujetos a confirmación. Las imágenes de referencia orientan el trabajo; no son una copia exacta.</p><button className="button primary" onClick={() => setSelected(products.find((product) => product.id === 'minimal')!)}>Empezar una solicitud <Sparkles /></button></div>
      </section>

      <section className="process-band"><img className="parallax" data-speed=".1" src="/images/gallery/atelier.webp" alt="Mesa de trabajo de pastelería y preparación artesanal" width="1400" height="900" loading="lazy" /><div className="process-overlay reveal"><p className="section-number">PEDIDOS POR ENCARGO</p><h2>Elegís. Personalizás.<br />Coordinamos.</h2><p>Al abrir WhatsApp recibimos tu solicitud completa y respondemos con la disponibilidad real.</p></div></section>

      <section className="gifts-section"><div className="gifts-copy reveal"><p className="section-number">05 — BOXES Y REGALOS</p><h2>Un box armado para regalar sin improvisar.</h2><p>Elegís el box, agregás un mensaje y coordinamos la entrega. También podés sumar una mini torta o piezas individuales.</p><button className="underlined-link" onClick={() => setSelected(products.find((product) => product.id === 'box')!)}>Ver box merienda <ArrowRight /></button></div><button className="gift-image reveal" onClick={() => setSelected(products.find((product) => product.id === 'box')!)}><img src="/images/products/box.png" alt="Box dulce con una selección de mini pastelería" width="736" height="552" loading="lazy" /><span>Para regalar o compartir</span></button></section>

      <section id="nosotros" className="story-section"><div className="story-image reveal"><img src="/images/gallery/gallery-detail.webp" alt="Detalle de una terminación de pastelería artesanal" width="900" height="1100" loading="lazy" /></div><div className="story-copy reveal"><p className="section-number">06 — NUESTRA FORMA DE TRABAJAR</p><h2>La pastelería se hace mejor cuando no se apura.</h2><p>Dulce Atelier trabaja en pequeñas producciones y por encargo. Cada pedido se organiza según la fecha, la cantidad de personas y el tipo de celebración.</p><p>Buscamos que cada pieza llegue fresca, bien resuelta y lista para compartir.</p><span className="story-signature">Dulce Atelier<br /><small>Pastelería por encargo</small></span></div></section>

      <section id="faq" className="faq-section"><div className="reveal"><p className="section-number">07 — INFORMACIÓN ÚTIL</p><h2>Antes de hacer tu pedido.</h2></div><div className="faq-list reveal">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

      <section id="contacto" className="delivery-section"><div className="delivery-title reveal"><p className="section-number">08 — RETIRO Y ENVÍO</p><h2>Zona Norte,<br />Buenos Aires.</h2></div><div className="delivery-info reveal"><p><MapPin /> Coordinamos retiro o envío una vez confirmado el pedido.</p><p><Truck /> Envíos en Zona Norte y alrededores · costo estimado: ${businessConfig.deliveryCost.toLocaleString('es-AR')}.</p><p><Clock3 /> Atención de lunes a sábados, de 9 a 18 h.</p><p><MessageCircle /> WhatsApp e Instagram para consultas y coordinación.</p><button className="underlined-link" onClick={() => go('coleccion')}>Hacer un pedido <ArrowRight /></button></div></section>
    </main>
    <footer><div className="brand"><CakeSlice aria-hidden="true" /><span>Dulce Atelier<small>pastelería por encargo</small></span></div><p>Pedidos por encargo en Zona Norte.</p><p>{businessConfig.instagram} · Sitio desarrollado por {businessConfig.agencyName}</p></footer>
    {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={pick} />}
    <CartDrawer open={drawer} onClose={() => setDrawer(false)} items={cart} setItems={setCart} onCheckout={() => { setDrawer(false); setCheckout(true); }} />
    {checkout && <CheckoutForm items={cart} onClose={() => setCheckout(false)} />}
  </>;
}
export default App;
