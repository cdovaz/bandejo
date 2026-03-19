import Link from 'next/link';

interface AdSpaceProps {
  imageUrl: string;
  adUrl: string;
  altText: string;
}

export default function AdSpace({ imageUrl, adUrl, altText }: AdSpaceProps) {
  return (
    <div className="my-8 w-full">
      <Link href={adUrl} target="_blank" rel="noopener noreferrer">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-auto rounded-lg shadow-lg hover:opacity-90 transition-opacity" 
        />
      </Link>
    </div>
  );
}
