import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ShadowDomProps = {
  children: ReactNode;
  id: string;
};

function ShadowDom({ children, id }: ShadowDomProps) {
  const node = useRef<HTMLElement>(null);
  const [rootNode, setRootNode] = useState<ShadowRoot>();

  useEffect(() => {
    if (node.current instanceof HTMLElement && !node.current.shadowRoot) {
      const root = node.current?.attachShadow({
        mode: 'open',
      });

      setRootNode(root);
    }
  }, []);

  return (
    <>
      <section ref={node} id={id} />
      {rootNode && createPortal(children, rootNode)}
    </>
  );
}

export default ShadowDom;
