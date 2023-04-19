import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ShadowDomProps = {
  children: ReactNode;
};

function ShadowDom({ children }: ShadowDomProps) {
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
      <span ref={node} />
      {rootNode && createPortal(children, rootNode)}
    </>
  );
}

export default ShadowDom;
