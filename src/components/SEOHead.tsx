import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author,
  publishedTime,
  modifiedTime 
}: SEOHeadProps) => {
  const baseUrl = 'https://audiolibros-horacio-lanci.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const defaultImage = `${baseUrl}/images/og-default.jpg`;
  const finalImage = image || defaultImage;
  
  // Construir título completo con branding
  const fullTitle = title.includes('Horacio Lanci') 
    ? title 
    : `${title} | Audiolibros Horacio Lanci`;
  
  return (
    <Helmet>
      {/* Títulos y descripción principal */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Audiolibros Horacio Lanci" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@HoracioLanci" />
      <meta name="twitter:site" content="@HoracioLanci" />
      
      {/* Meta tags adicionales para artículos/libros */}
      {author && <meta name="author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* SEO técnico */}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Meta tags específicos para audiolibros */}
      {type === 'book' && (
        <>
          <meta property="book:author" content={author || 'Autor clásico'} />
          <meta property="book:release_date" content={publishedTime} />
          <meta name="dc.type" content="AudioBook" />
          <meta name="dc.format" content="audio/mpeg" />
          <meta name="dc.language" content="es" />
        </>
      )}
    </Helmet>
  );
};

export default SEOHead;