import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-6 mb-3 text-3xl font-bold" {...props} />,
    h2: (props) => <h2 className="mt-6 mb-2 text-2xl font-semibold" {...props} />,
    h3: (props) => <h3 className="mt-4 mb-2 text-xl font-semibold" {...props} />,
    p: (props) => <p className="my-3 leading-relaxed" {...props} />,
    ul: (props) => <ul className="my-3 list-disc space-y-1 pl-6" {...props} />,
    ol: (props) => <ol className="my-3 list-decimal space-y-1 pl-6" {...props} />,
    a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
    ...components,
  };
}
