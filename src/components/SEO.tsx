import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'Trustique Assist - AI & Software Solutions Company | India',
  description = 'Trustique Assist: AI specialists, developers & designers delivering intelligent software solutions. Machine Learning, Web Development, Mobile Apps, Digital Transformation.',
  keywords = 'AI solutions, software development, web development, machine learning, mobile app development, digital transformation, India',
  image = 'https://trustiqueassist.com/logo.png',
  url = 'https://trustiqueassist.com',
  type = 'website'
}: SEOProps) => {
  const siteTitle = title.includes('Trustique Assist') 
    ? title 
    : `${title} | Trustique Assist`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Trustique Assist" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@trustiqueassist" />
      <meta name="twitter:creator" content="@trustiqueassist" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;