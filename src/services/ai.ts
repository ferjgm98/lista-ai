import type { ProductInput, Locale, Tone } from '../types';

interface AIInput {
  images: string[];
  product: ProductInput;
  locale?: string;
}

interface AIOutput {
  title: string;
  short_description: string;
  long_description: string;
  category_id: string | null;
  category_name: string | null;
  attributes: Record<string, string>;
  keywords: string[];
}

/**
 * Generates listing content using OpenAI's GPT-4o or Claude.
 * In production, this calls the LLM API. For the scaffold, we return
 * a mock response that demonstrates the output structure.
 */
export async function generateListingContent(input: AIInput): Promise<AIOutput> {
  const { product, locale = 'es-MX' } = input;
  const lang = locale.startsWith('pt') ? 'Português (Brasil)' : 'Español (Latinoamérica)';

  // TODO: Replace with actual API call
  //
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4o',
  //     messages: [
  //       {
  //         role: 'system',
  //         content: getSystemPrompt(locale, product.tone),
  //       },
  //       {
  //         role: 'user',
  //         content: buildPrompt(product),
  //       },
  //     ],
  //     response_format: { type: 'json_object' },
  //   }),
  // });
  // const data = await response.json();
  // return JSON.parse(data.choices[0].message.content);

  return generateMockOutput(product, locale);
}

function getSystemPrompt(locale: string, tone?: Tone): string {
  const language = locale.startsWith('pt') ? 'Português Brasileiro' : 'Español Latinoamericano';
  const variant = locale.startsWith('pt') ? 'variante brasileira' : `variante regional (${locale})`;

  return `Eres un experto redactor de listings para Mercado Libre. Genera contenido optimizado para el motor de búsqueda de ML.

Idioma: ${language} (${variant})
Tono: ${tone || 'professional'}

Reglas:
- Títulos: 60-80 caracteres, incluir atributos clave + palabras de búsqueda
- Descripción corta: 50-100 caracteres, destacar valor único
- Descripción larga: 300-500 caracteres, SEO optimizada
- Categoría: sugerir la categoría ML más relevante
- Keywords: 5-10 términos de búsqueda relevantes

Responde SIEMPRE en formato JSON.`;
}

function buildPrompt(product: ProductInput): string {
  return `Genera un listing optimizado para este producto:

${product.name ? `Nombre: ${product.name}` : ''}
${product.brand ? `Marca: ${product.brand}` : ''}
${product.color ? `Color: ${product.color}` : ''}
${product.material ? `Material: ${product.material}` : ''}
${product.size ? `Tamaño: ${product.size}` : ''}
${product.price ? `Precio: ${product.price} ${product.currency || 'MXN'}` : ''}
${product.condition ? `Condición: ${product.condition}` : ''}
${product.notes ? `Notas del vendedor: ${product.notes}` : ''}
${product.category_hint ? `Categoría sugerida: ${product.category_hint}` : ''}

Genera el JSON con: title, short_description, long_description, category_id, category_name, attributes (object), keywords (array).`;
}

function generateMockOutput(product: ProductInput, locale: string): AIOutput {
  const name = product.name || 'Producto';
  const brand = product.brand ? `${product.brand} ` : '';
  const color = product.color || '';
  const material = product.material || '';

  const isPortuguese = locale.startsWith('pt');
  const title = isPortuguese
    ? `${brand}${name}${color ? ` ${color}` : ''}${material ? ` ${material}` : ''} - Original - Qualidade Premium`
    : `${brand}${name}${color ? ` ${color}` : ''}${material ? ` ${material}` : ''} - Original - Calidad Premium`;

  return {
    title,
    short_description: isPortuguese
      ? `${brand}${name} original com qualidade premium. Perfeito para uso diário. Envio rápido!`
      : `${brand}${name} original con calidad premium. Perfecto para uso diario. ¡Envío rápido!`,
    long_description: isPortuguese
      ? `Descubra o ${brand}${name} que combina qualidade, estilo e durabilidade. Fabricado com materiais premium, este produto oferece desempenho excepcional para uso diário. Características principais: material de alta qualidade, design moderno e funcional, acabamento impecável. Ideal para quem busca o melhor em ${product.category_hint || 'sua categoria'}. Compatível com todos os padrões do mercado. Aproveite esta oferta exclusiva!`
      : `Descubre el ${brand}${name} que combina calidad, estilo y durabilidad. Fabricado con materiales premium, este producto ofrece un rendimiento excepcional para uso diario. Características principales: material de alta calidad, diseño moderno y funcional, acabado impecable. Ideal para quienes buscan lo mejor en ${product.category_hint || 'su categoría'}. Compatible con todos los estándares del mercado. ¡Aprovecha esta oferta exclusiva!`,
    category_id: 'MLM-12345',
    category_name: product.category_hint || 'Otra categoría',
    attributes: {
      brand: brand.trim() || 'Genérico',
      color: color || 'No especificado',
      material: material || 'No especificado',
      condition: product.condition || 'new',
    },
    keywords: [
      name.toLowerCase(),
      brand.toLowerCase().trim(),
      color.toLowerCase(),
      material.toLowerCase(),
      'original',
      'calidad premium',
      'envío gratis',
    ].filter(Boolean),
  };
}
