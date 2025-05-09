
import CategorySide from '../../components/CategorySide';
import TransationSide from '../../components/TransactionSide';
import PageLayout from '../../layout/PageLayout';

function CategoryPage() {
  return (
    <>
      <PageLayout>
        <div className="container">
          <div>
            <h2>Category Side</h2>
            <CategorySide />
          </div>
          <div>
            <h2>Transaction Side</h2>
            <TransationSide />
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export default CategoryPage
